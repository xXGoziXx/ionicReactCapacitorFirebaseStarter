import os
import traceback
from firebase_functions import https_fn, options
from google.cloud import aiplatform

import vertexai

import requests

import json

from vertexai.generative_models import (
    Content,
    FunctionDeclaration,
    GenerationConfig,
    GenerativeModel,
    Part,
    Tool,
)


from vertexai.preview.generative_models import grounding


# load_dotenv()


PROJECT_ID = os.environ.get("PROJECT_ID")  # @param {type:"string"}

LOCATION = os.environ.get("LOCATION")  # @param {type:"string"}


RESPONSE_PREFIX = "```json"


vertexai.init(project=PROJECT_ID, location=LOCATION)


model = GenerativeModel("gemini-1.5-pro-001")


#  VERTEX AI FUNCTION CALLING DECLARATIONS

get_posts = FunctionDeclaration(
    name="get_posts",
    description="Get the tiktok posts by keywords",
    parameters={
        "type": "object",
        "properties": {
            "keywords": {
                "type": "string",
                "description": "key words to search posts by",
            }
        },
        "required": ["keywords"],
    },
)





# CUSTOM FUNCTION FOR GETTING POSTS
get_posts_tool = Tool(
    function_declarations=[get_posts],
)


# GROUNDING TOOL - GOOGLE WEB SEARCH
grounding_tool = Tool.from_google_search_retrieval(grounding.GoogleSearchRetrieval())


def stream_api_response(url, headers, params):
    """

    Make a GET request to the specified URL with headers and parameters.
    Stream the response and process it line by line.


    Args:

        url (str): The URL to make the GET request to.

        headers (dict): The headers to include in the request.

        params (dict): The parameters to include in the request.


    Returns:

        list: A list of processed data from the streamed response.
    """

    response = requests.get(url, headers=headers, params=params)

    # Return the raw response text
    return response.text


# function for links


def get_video_links(location):

    params = {}

    prompt_text = f"""

        1. Generate TikTok search keywords relating to the location: {location}. Keywords must be comma separated, no punctuation (apostrophes) no slashes, no logical operands (AND, OR).

        The keywords should help users discover content related to this location. Dont add the address code. Use hashtags where relevant. Max of 10 keywords.

        2. Use these keywords to make a GET request to the TikTok API.

        3. Return multiple TikTok video links (https://www.tiktok.com/@{{username}}/video/{{video_id}}) for each that apply. Get the cover from the API response for the thumbnail

        4. Give reasons for why these videos are related to the location.

        5. Based of the reasons given in the previous step and the information from the video and menu, rank the results from the API response in order of accuracy as a percentage. Don't be verbose

        6. State what happens in the video in 'ocr' property.

        7. Output the results in a JSON format like the example below



        JSON Format example:

        [

        {{

            "link": "https://www.tiktok.com/@username/video/video_id",

            "accuracy": 100,

            "reason": "shows logo",

            "ocr": "this video has a menu with the location logo and branding"

            "thumbnail": "https://www.tiktok.com/videoid/thumbnail.jpg"

        }}

        ]
    """

    try:

        prompt = Content(role="user", parts=[Part.from_text(prompt_text)])

        prompt_response = model.generate_content(
            prompt,
            generation_config=GenerationConfig(temperature=0),
            tools=[get_posts_tool],
        )

        for key, value in (
            prompt_response.candidates[0].content.parts[0].function_call.args.items()
        ):

            params[key] = value.encode("utf-8")

        print(params)

        # API CALL

        url = (
            "https://tiktok-api15.p.rapidapi.com/index/Tiktok/searchVideoListByKeywords"
        )

        headers = {
            "x-rapidapi-key": f"{os.environ.get("KEY")}",
            "x-rapidapi-host": "tiktok-api15.p.rapidapi.com",
        }

        api_response = stream_api_response(url, headers, params)

        print(api_response)

        response = model.generate_content(
            [
                prompt,
                prompt_response.candidates[0].content,
                Content(
                    parts=[
                        Part.from_function_response(
                            name="get_posts", response={"content": api_response}
                        )
                    ]
                ),
            ],
            tools=[get_posts_tool],
        )

        # Convert JSON string to Python dictionary

        print(response.text)

        cleaned_response = response.text.strip(RESPONSE_PREFIX).strip("```")

        video_objects = json.loads(cleaned_response)

        # Print the converted dictionary

        print(video_objects)

        return video_objects

    except Exception as e:
        traceback.print_exc()

        print(f"Error getting video links: {e}")

        return []


# function for reservation/booking links


def get_reservation_links(location, name):

    menu_prompt = f"""

            You are a helpful assistant that assists users in finding information about restaurants. You will receive the name and location of a restaurant. Your task is to find URLs related to online booking/reservations and menus for the specified restaurant.

Instructions:

Perform a web search using the provided restaurant name and location.

Use only the information found in the top web search results.

Check the page content of each search result.

Extract ALL relevant URLs main URL and sub routes for reservations and menus directly from the page.

Do not fabricate or assume any URLs or information not present in the search results.

Ensure the URLs are valid and directly related to the specified restaurant.



Here are some sample URLs for reference:

Example url: https://www.restaurant.com/reservations

Example url: https://www.restaurant.com/reservations/

Example url: https://www.restaurant.com/menu

Example url: https://www.restaurant.com/menu/drinks

Example url: https://www.restaurant.com/menu/desserts



Output Format:

Output the results as a JSON object with the following structure:

```json


{{

  \"reservation\": [ /* array of reservation URLs */ ],

  \"menu\": [ /* array of menu URLs */ ]

}}

```

If no URLs are found for a category, return an empty array for that category.


Restaurant Name: {name}

Restaurant Location: {location}
    """

    generation_config = GenerationConfig(
        temperature=0.3, top_p=0, max_output_tokens=8192
    )

    try:

        response = model.generate_content(
            menu_prompt, tools=[grounding_tool], generation_config=generation_config
        )

        encoded_response = response.text

        print(encoded_response)

        if response.text.startswith(RESPONSE_PREFIX):
            return json.loads(encoded_response.strip(RESPONSE_PREFIX).strip("```"))

        else:

            return json.loads(encoded_response)

    except json.JSONDecodeError as e:

        print(f"Error decoding JSON output for reservation-menu links: {e}")

        return {"reservation": ["", ""], "menu": ["", ""]}

    except Exception as e:

        print(f"Error getting reservation links: {e}")

        return {"reservation": ["", ""], "menu": ["", ""]}


# function for menu types


def get_types(location):

    label_prompt = f"""

    Search for all possible food labels on cuisine the restaurant at this location: {location}. Examples of food labels are sushi, pizza, things that might be the major thing that is there.

    The categories to consider are Asian, Italian, American, Mexican, Mediterranean, Cafe's/Bakery, and Other.


    Based on the search results gathered in the previous step and the information found, rank the results in order of accuracy as a percentage. Don't be verbose.


    Output the results in a JSON format like the example below.


    JSON Format example:



    [

    {{

        "label": "Asian",

        "accuracy": 95,

        "reason": "a detailed explanation from what was found in the search"

    }},

    {{

        "label": "Other",

        "accuracy": 80,

        "reason": "a detailed explanation from what was found in the search"

    }}

    ]

"""

    try:

        response = model.generate_content(label_prompt, tools=[grounding_tool])
        print(response.text)
        encoded_response = response.text

        if response.text.startswith(RESPONSE_PREFIX):

            return json.loads(encoded_response.strip(RESPONSE_PREFIX).strip("```"))

        else:

            return json.loads(encoded_response)

    except json.JSONDecodeError as e:

        print(f"Error decoding JSON output for reservation-menu links: {e}")

        return []

    except Exception as e:

        print(f"Error getting labels: {e}")

        return []


# function for menu types


def get_labels(location):

    label_prompt = f"""

    Search for all possible restaurant labels on cuisine the restaurant at this location: {location}. Examples of restaurant labels are based on the kind of setting the place gives off. The categories to consider are Casual, Fine Dining, and Brunch.



    Based on the search results gathered in the previous step and the information found, rank the results in order of accuracy as a percentage. Don't be verbose.


    Output the results in a JSON format like the example below.


    JSON Format example:



    [

    {{

        "label": "Brunch",

        "accuracy": 95,

        "reason": "a detailed explanation from what was found in the search"

    }},

    {{

        "label": "Casual",

        "accuracy": 80,

        "reason": "a detailed explanation from what was found in the search"

    }}

    ]

"""

    try:

        response = model.generate_content(label_prompt, tools=[grounding_tool])

        print(response.text)

        encoded_response = response.text

        if response.text.startswith(RESPONSE_PREFIX):

            return json.loads(encoded_response.strip(RESPONSE_PREFIX).strip("```"))

        else:

            return json.loads(encoded_response)

    except json.JSONDecodeError as e:

        print(f"Error decoding JSON output for reservation-menu links: {e}")

        return []

    except Exception as e:

        print(f"Error getting labels: {e}")

        return []


@https_fn.on_request(
    timeout_sec=300,
    memory=options.MemoryOption.MB_512,
    cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ),
)
def postbot_videos(req: https_fn.Request) -> https_fn.Response:

    print("hello there :)")

    location = req.args.get("location")

    if location is None:

        return https_fn.Response("No location provided", status=400)

    video_links = get_video_links(location)

    return {"videos": video_links}

    # would run the necessary AI functions here..


@https_fn.on_request(
    timeout_sec=300,
    memory=options.MemoryOption.MB_512,
    cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ),
)
def postbot_location(req: https_fn.Request) -> https_fn.Response:

    print("getting location info")
    location = req.args.get("location")
    name = req.args.get("name")
    full_address = req.args.get("full_address")

    if location is None:
        return https_fn.Response("No location provided", status=400)

    menu_reservation_links = get_reservation_links(location, name)
    types = get_types(full_address)
    labels = get_labels(full_address)

    return {
        "foodTypes": types,
        "menu": menu_reservation_links.get("menu", None),
        "reservation": menu_reservation_links.get("reservation", None),
        "labels": labels,
    }
