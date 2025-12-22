import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import CKEditorForEmailTemplate from "../components/CkEditorComponentForEmailTemplates/CKEditor.jsx";

const SendEmailTemplate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);

    const [emailTemplateDetails, setEmailTemplateDetails] = useState({
        emailName: "",
        subject: "",
        whereUsed: "",
        description: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailTemplateDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const setVideoDescription = (data) => {
        if (typeof data === "string") {
            setEmailTemplateDetails((prev) => ({
                ...prev,
                description: data,
            }));
        }
    };



    const callTestEmailTemplates = async () => {
        setIsLoading(true);
      
        const { subject, description, whereUsed, emailName } =
          emailTemplateDetails;
      
        const req = {
          subject,
          body: description,
          cC: whereUsed,
          to: emailName,
        };
      
        try {
          const response = await fetch(
            "https://redastest-api.flyingcapetech.com/api/EmailTesting/TestEmailTemplates",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req),
            }
          );
      
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
      
          alert("Email sent successfully");
      

          setEmailTemplateDetails({
            emailName: "",
            subject: "",
            whereUsed: "",
            description: "",
          });
      
        } catch (error) {
          alert("Failed to send email");
        } finally {
          setIsLoading(false);
        }
      };
      

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="main-body-section">
            <div className="bg-white">
                <div className="heading-part px-7 py-4 border-b">
                    <h4 className="small-title font-bold theme-color">
                        Email Template
                    </h4>
                </div>

                <div className="px-8 pt-10">
                    <div className="grid xl:grid-cols-12 gap-6 pb-8">

                        <div className="xl:col-span-6">
                            <h2 className="text-xl theme-color mb-1">Email To</h2>
                            <input
                                type="text"
                                name="emailName"
                                value={emailTemplateDetails.emailName}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="xl:col-span-6">
                            <h2 className="text-xl theme-color mb-1">Email Subject</h2>
                            <input
                                type="text"
                                name="subject"
                                value={emailTemplateDetails.subject}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="xl:col-span-6">
                            <h2 className="text-xl theme-color mb-1">Email CC</h2>
                            <input
                                type="text"
                                name="whereUsed"
                                value={emailTemplateDetails.whereUsed}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="xl:col-span-12">
                            <h2 className="text-xl theme-color mb-1">
                                Template Description
                            </h2>

                            <div className="editor-wrapper">
                                <div className="stylekit-for-ckeditor">
                                    <CKEditorForEmailTemplate
                                        data={emailTemplateDetails.description}
                                        onChange={setVideoDescription}
                                    />

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-between mt-12 pb-8">
                        <button
                            className="w-32 btn-gray"
                            onClick={() =>
                                setRedirect("/")
                            }
                        >
                            Back
                        </button>

                        {isLoading ? null : (
                            <button
                                className="btn-red px-7 py-2"
                                onClick={callTestEmailTemplates}
                            >
                                Send Email
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendEmailTemplate;
