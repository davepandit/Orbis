import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEditEventFaqsMutation } from "../slices/eventSlice";
import { useGetEventFaqsQuery } from "../slices/eventSlice";

const EditEventFaqs = () => {
  const { admin, eventId } = useParams();
  const [editEventFaqs] = useEditEventFaqsMutation();
  const { data: fetchedFaqs, isLoading } = useGetEventFaqsQuery(eventId);
  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  useEffect(() => {
    if (fetchedFaqs && !isLoading) {
      setFaqs(fetchedFaqs);
    }
  }, [fetchedFaqs, isLoading]);

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleSave = async () => {
    console.log("faqs:", faqs);

    try {
      const res = await editEventFaqs({ faqs, admin, eventId }).unwrap();

      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Event FAQs</h2>

            {faqs.map((faq, index) => (
              <div key={index} className="space-y-4 p-4 shadow-sm bg-white">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Question {index + 1}
                  </label>
                  <textarea
                    value={faq.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="Enter the FAQ question"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Answer {index + 1}
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    placeholder="Enter the FAQ answer"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddFaq}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm transition-all hover:cursor-pointer"
            >
              <FiPlusCircle className="text-lg" />
              Add FAQ
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventFaqs;
