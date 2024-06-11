import AllPosts from "@/components/AllPosts";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className=" w-full h-screen ">
      <div className=" min-h-screen w-full  sm:px-[100px] pb-10  bg-white   bg-grid-black/[0.2] relative ">
        <Nav />
        <h1 className=" mt-5 sm:mt-10 leading-none text-primary font-black text-[40px] sm:text-[50px] text-center">
          DevCon, A social platform for Programmers. <br />

        </h1>
        <AllPosts/>

      </div>
    </main>
  );
}
