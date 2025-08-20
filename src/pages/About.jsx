import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-900 pt-30 p-10 flex flex-col items-center text-gray-300 ">
      <div className="max-w-6xl w-full bg-gray-800 rounded-3xl shadow-xl p-12 flex flex-col md:flex-row gap-10">
        
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src="https://i.pinimg.com/1200x/4b/fa/c2/4bfac2846c9c552d5b42d6798728a81f.jpg"
            alt="NOVA Bites"
            className="rounded-3xl shadow-lg object-cover w-full max-h-[400px]"
          />
        </div>

       
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6 text-yellow-600">
            About Nova Bites
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            At <span className="font-semibold">Delicious Eats</span>, we believe food is more than just fuel — it’s an experience. Our mission is to bring fresh, flavorful meals straight to your door, combining quality ingredients with convenience and speed.
          </p>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li> Locally sourced fresh ingredients</li>
              <li> Lightning-fast delivery</li>
              <li> Easy to use, intuitive app</li>
              <li> Diverse cuisine options to satisfy every craving</li>
              <li> 24/7 customer support ready to help</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
            <p>
              Have questions or feedback? We'd love to hear from you! Reach out at:
            </p>
            <p className="mt-2">
              <a
                href="mailto:support@deliciouseats.com"
                className="text-yellow-600 hover:underline"
              >
                support@novabeties.com
              </a>
            </p>
            <p>
              <a href="tel:+ 8590179040" className="text-yellow-600 hover:underline">
                +91 8590179040
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
