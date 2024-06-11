
import Loader from "./Loader";
import PostCard from "./PostCard";

const SearchPosts = ({ searchData, loading }) => {
  
  return (
    <div>
      <section className="mt-10 px-[10px] flex flex-col items-center gap-4 flex-wrap">
        {loading ? (
          <Loader color={"primary"} />
        ) : (
          <>
            {searchData.length > 0 ? (
              searchData.map((user) =>
                user.posts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    imgUrl={post.imageUrl}
                    profilePic={user.profileInfo && user.profileInfo.imageUrl}
                    postOwnerId={user._id}
                    postId={post.id}
                    username={user.username}
                    viewProfileLink={user._id}
                  />
                ))
              )
            ) : (
              <p>No posts found</p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default SearchPosts;
