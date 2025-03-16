
import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType[1];

export function useCarousel(options?: EmblaOptionsType) {
  const [emblaRef, api] = useEmblaCarousel({
    loop: false,
    ...options,
  });
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return {
    emblaRef,
    api,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
