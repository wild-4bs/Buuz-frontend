export const About = ({ about, name }: { about?: string; name?: string }) => {
  return (
    <>
      <div className="about pt-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4 text-center">About {name}</h1>
          <p className="text-base text-center">{about}</p>
        </div>
      </div>
    </>
  );
};
