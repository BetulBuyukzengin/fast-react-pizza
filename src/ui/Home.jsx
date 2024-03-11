import CreateUser from '../features/user/CreateUser';
function Home() {
  return (
    //* add 10 to the y axis (margin)
    <div className="my-10 text-center">
      {/* text-[50px] */}
      <h1 className=" mb-8 text-center text-xl font-semibold ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
