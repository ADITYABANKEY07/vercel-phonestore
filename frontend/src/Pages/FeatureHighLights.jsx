import { FaShippingFast, FaThumbsUp, FaWhatsapp, FaPercent } from 'react-icons/fa';

const features = [
  {
    icon: <FaShippingFast size={30} />,
    title: 'Free Shipping',
    desc: 'Get shipping on order over ₹350',
  },
  {
    icon: <FaThumbsUp size={30} />,
    title: 'Quality Tested',
    desc: 'Replacement against manufacturing defects',
  },
  {
    icon: <FaWhatsapp size={30} />,
    title: 'WhatsApp Support',
    desc: '9 am to 6 pm, Monday to Saturday',
  },
  {
    icon: <FaPercent size={30} />,
    title: 'Get 20% Off!',
    desc: 'Use code "20OFF" at checkout',
  },
];

function FeatureHighlights() {
  return (
    <div className="bg-blue-400 text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center px-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
