import { Button } from "flowbite-react";

const Hero = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Text Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The people platform—Where interests become friendships
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Whatever your interest, from hiking and reading to networking and
              skill sharing, there are thousands of people who share it on
              Meetup. Events are happening every day—sign up to join the fun.
            </p>

            <Button
              pill
              size="xl"
              color="tealButton"
              className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
            >
              Join Orbis
            </Button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-pink-100 rounded-full w-80 h-80 sm:w-96 sm:h-96 -z-10 transform translate-x-4 translate-y-4"></div>

              {/* SVG Illustration */}
              <div className="w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                <img src="/hero_image.svg" alt="heroimage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
