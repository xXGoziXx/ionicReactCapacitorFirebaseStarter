import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

interface SwiperCarouselProps {
    slides: number[]
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ slides }) => {

    return (
        <Swiper modules={[Virtual]} slidesPerView={1} direction="vertical" >
            {slides.map((slideContent, index) => (
                <SwiperSlide key={slideContent} className="embla__slide__number w-screen h-[50vh]">
                    {slideContent + 1}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperCarousel;
