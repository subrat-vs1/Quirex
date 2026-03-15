import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12">
      <div className="max-w-8xl mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3 sm:col-span-2">
          <div className="flex items-center mb-3 text-white font-bold text-4xl">
            <img
              src="/img/brand-favicon.png"
              alt="Quirex Logo"
              className="mr-2 w-12 object-contain"
            />
            Quirex
          </div>

          <p className="text-sm mb-4">
            Lorem Ipsum is simply dummy text of the and typesetting industry.
            Lorem Ipsum is dummy text of the printing.
          </p>

          <p className="flex items-start mb-2">
            <MapPin className="mr-2 mt-1 w-4 h-4" />
            Brooklyn, New York, United States
          </p>

          <p className="flex items-center mb-2">
            <Phone className="mr-2 w-4 h-4" />
            +0123-456789
          </p>

          <p className="flex items-center mb-3">
            <Mail className="mr-2 w-4 h-4" />
            example@example.com
          </p>

          <div className="flex gap-3 text-white">
            <a href="#">
              <Facebook size={18} />
            </a>
            <a href="#">
              <Twitter size={18} />
            </a>
            <a href="#">
              <Linkedin size={18} />
            </a>
            <a href="#">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="lg:col-span-2 sm:col-span-1">
          <h5 className="text-white font-semibold mb-3">Company</h5>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">All Products</a>
            <a href="#">Locations Map</a>
            <a href="#">FAQ</a>
            <a href="#">Contact us</a>
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-2 sm:col-span-1">
          <h5 className="text-white font-semibold mb-3">Services</h5>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#">Order tracking</a>
            <a href="#">Wish List</a>
            <a href="#">Login</a>
            <a href="#">My account</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Promotional Offers</a>
          </div>
        </div>

        {/* Customer Care */}
        <div className="lg:col-span-2 sm:col-span-1">
          <h5 className="text-white font-semibold mb-3">Customer Care</h5>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#">Login</a>
            <a href="#">My account</a>
            <a href="#">Wish List</a>
            <a href="#">Order tracking</a>
            <a href="#">FAQ</a>
            <a href="#">Contact us</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-3 sm:col-span-2">
          <h5 className="text-white font-semibold mb-3">Newsletter</h5>

          <p className="text-sm mb-4">
            Subscribe to our weekly Newsletter and receive updates via email.
          </p>

          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Email*"
              className="flex-1 px-3 py-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none"
            />

            <button className="bg-red-500 px-4 flex items-center justify-center rounded-r text-white">
              <Send size={18} />
            </button>
          </div>

          <h6 className="text-white text-sm mb-2">We Accept</h6>

          <img
            src="/img/payment-methods.png"
            alt="Payment Methods"
            className="lg:col-span-3"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-10 py-4">
        <div
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row
                        justify-between items-center text-sm"
        >
          <div className="text-center">
            All Rights Reserved @ Company {new Date().getFullYear()}
          </div>

          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#">Terms & Conditions</a>
            <a href="#">Claim</a>
            <a href="#">Privacy & Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
