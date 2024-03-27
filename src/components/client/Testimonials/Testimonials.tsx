"use client";
import StarRating from "@/components/general/RaitingStars/RatingStars";
import "./Testimonials.scss";
import React, { FC, useRef, useState } from "react";
import { TestimonialsItem } from "@/mokData/testimonialsData";
import { ArrowLong } from "@/components/svg/Arrow/Arrow-long";
import { useGSAP } from "@gsap/react";
import { gsap, Power3 } from "gsap";
type TestimonialsData = TestimonialsItem[];

interface TestimonialsProps {
  data: TestimonialsData;
}

const Testimonials: FC<TestimonialsProps> = ({ data }) => {
  let itemsList = useRef<HTMLUListElement | null>(null);
  const itemsPerPage = 3;
  const [offset, setOffset] = useState<number>(0);
  const [startReached, setStartReached] = useState<boolean>(true);
  const [endReached, setEndReached] = useState<boolean>(false);
  useGSAP(
    () => {
      const shift =
        itemsList.current?.children[0]?.getBoundingClientRect().width || 0;
      console.log("shift", shift);

      Array.from(itemsList.current?.children || []).forEach((el, _) => {
        gsap.to(el as HTMLElement, {
          x: -(shift * offset),
          ease: Power3.easeOut,
          duration: 1,
        });
      });
    },
    { dependencies: [offset] }
  );
  const handleArrowClick = (direction: "next" | "prev") => {
    setOffset((prevOffset) => {
      let newOffset =
        prevOffset + (direction === "next" ? itemsPerPage : -itemsPerPage);
      console.log("newOffset", newOffset);

      if (newOffset < 0) {
        newOffset = 0;
        setStartReached(true);
        setEndReached(false);
      } else if (newOffset >= data.length) {
        newOffset = data.length - itemsPerPage;
        console.log("newOffset else if", newOffset);
        console.log("data.length", data.length);

        setStartReached(false);
        setEndReached(true);
      }
      return newOffset;
    });
  };

  return (
    <section className="container-testimonials">
      <h5 className="title-testimonials">Відгуки наших покупців</h5>
      <ul className="main-testimonials-wrapper" ref={itemsList}>
        {data.map((item) => (
          <li key={item.id}>
            <div className="testimonials-item">
              <div className="item-top-part">
                <div className="item-name">
                  <span className="item-name">
                    {item.name.toUpperCase()}, {item.date}
                  </span>
                  <StarRating rating={item.rating} />
                </div>
                <span className="item-text">{item.testimonial}</span>
              </div>
              <div className="item-bottom-part">
                <img src={item.image} alt="Image" className="product-img" />

                <div className="product-info">
                  <span className="product-title">
                    {item.title.toUpperCase()}
                  </span>
                  <span className="product-category">{item.category}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="arrow-block">
        <button
          className="arrow-back-button"
          type="button"
          name="arrow-control"
          title="arrow-control"
          disabled={startReached}
          onClick={() => handleArrowClick("prev")}>
          <ArrowLong className="arrow-back" />{" "}
        </button>
        <button
          className="arrow-forward-button"
          type="button"
          name="arrow-control"
          title="arrow-control"
          disabled={endReached}
          onClick={() => handleArrowClick("next")}>
          <ArrowLong className="arrow-forward" />{" "}
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
