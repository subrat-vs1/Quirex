import Animities from "./Animities";
import Counter from "./Counter";
import Navbar from "./Navbar";
import Property from "./Property";
import Services from "./Services";
import Slider from "./Slider";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Counter />
      <Services />
      <Property />
      <Animities />
      <Testimonial />
    </>
  );
};

export default Home;
