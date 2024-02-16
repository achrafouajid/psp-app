import React from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import get_blogs from "../../../../../server/blog/get_blogs";
import CardBlog from "@/components/CardBlog";
import { Chip } from "@nextui-org/react";
import FeaturedPosts from "@/components/FeaturedPosts";

const Blogs = async () => {
  const data = await get_blogs();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Module Education Patients"
        title="Module d'éducation des patients"
      />
      <div className="flex container mx-auto px-10 mb-8">
        <FeaturedPosts />
        <div className="w-3/4 py-[50px]">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
              {data.map((e) => (
                <div key={e.id}>
                  <CardBlog {...e} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4 px-3 mb-6 row-auto">
          <div className="col-span-3">
            <div className=" mb-3 bg-white rounded-lg p-6">
              <h3 className=" text-base font-semibold leading-7 mb-4">
                Filtrer par:
              </h3>
              <div>
                <h5 className="text-sm font-semibold leading-6 mb-3">Tags</h5>
                {/*  {data.categories.map(() => (
        <span key={e.id} className="ml-3 flex items-center gap-1">
          <Chip
            size="sm"
            style={{ backgroundColor: e.categories, color: "white" }}
          >
            {e.categories.}
          </Chip>
        </span>
      ))}*/}
              </div>
            </div>

            <div className="filter-card mb-3 bg-white rounded-lg p-6">
              <h3 className="filter-title text-base font-semibold leading-7 mb-4">
                Articles que vous pourrez apprécier
              </h3>
              {data.map((e) => (
                <div className=" mb-3 flex" key={e.id}>
                  <div className="w-1/2">
                    <img src={e.image.url} className="rounded-xl" alt="watch" />
                  </div>
                  <div className="w-1/2">
                    <h5 className="font-bold text-xs my-1">{e.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
