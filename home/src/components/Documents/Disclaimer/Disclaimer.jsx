import React, { useEffect } from "react";
import "./disclaimer.scss";
const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="disclaimer-container">
      <h2 className="disclaimer-main-title">DISCLAIMER:</h2>
      <p className="disclaimer-description">
        The information provided on this website is intended for informational
        and educational purposes only. It is not a substitute for professional
        medical advice, diagnosis, or treatment. Always seek the advice of your
        physician or other qualified health provider with any questions you may
        have regarding a medical condition.
      </p>
      <p className="disclaimer-description">
        The customized diet plans offered on this Website are designed to
        provide general dietary guidance to individuals seeking to address
        specific health issues such as diabetes, obesity, and other
        lifestyle-related concerns. These plans are based on the information
        provided by the user and their dietary preferences.
      </p>
      <p className="disclaimer-description">
        It is important to note that the results of these customized diet plans
        may vary from person to person. The effectiveness of any diet plan is
        influenced by various factors including genetics, overall health,
        adherence to the plan, and individual lifestyle choices.
      </p>
      <p className="disclaimer-description">
        Our customized diet plans may recommend specific organic and natural
        ingredients to support your health goals. However, individuals with
        allergies or sensitivities should exercise caution and carefully review
        the recommended ingredients to ensure they are safe for consumption. We
        do not assume any liability for adverse reactions to food consumed as a
        result of our diet plans.
      </p>
      <p className="disclaimer-description-one">
        By using this Website and participating in our customized diet plans,
        you acknowledge and agree that:
      </p>
      <ol className="ordered-list">
        <li>
          Nutritional Guidance Disclaimer: The diet plans, nutritional
          information, and content provided on this website are intended for
          informational and educational purposes only and are not a substitute
          for professional medical advice, diagnosis, or treatment. Always seek
          the advice of your physician or other qualified healthcare provider
          with any questions you may have regarding a medical condition. Never
          disregard professional medical advice or delay in seeking it because
          of something you have read on this website.
        </li>
        <li>
          Allergies and Sensitivities: Users are solely responsible for
          providing accurate and up-to-date information about their allergies,
          sensitivities, and medical conditions. While we strive to customize
          the diet plans to address specific health concerns, it is essential to
          review the ingredient list carefully and consult with a qualified
          healthcare professional if you have concerns about allergies or
          sensitivities. Our diet plans may contain common allergens, and users
          should exercise caution and use their discretion when selecting and
          consuming foods.
        </li>
        <li>
          Results and Expectations: The results achieved from following our diet
          plans may vary for each individual and are influenced by numerous
          factors, including genetics, overall health, adherence to the plan,
          and other lifestyle choices. We do not guarantee specific outcomes,
          and any testimonials or success stories shared on this website should
          not be interpreted as typical or guaranteed results. Achieving health
          goals requires commitment, effort, and consistency over time, along
          with consultation with healthcare professionals as needed.
        </li>
        <li>
          Modification of Plans: We are committed to providing accurate and
          up-to-date nutritional information and diet plans based on the latest
          research and industry standards. However, we reserve the right to
          modify, update, or remove any content, including diet plans, recipes,
          and other materials, as new information becomes available or to
          improve user experience. Users will be notified of any significant
          changes to the provided plans via website updates or direct
          communication.
        </li>
        <li>
          Not a Substitute for Medical Treatment: The diet plans, nutritional
          guidance, and information provided on this website are not intended to
          replace or serve as a substitute for professional medical advice,
          diagnosis, or treatment. They are not a substitute for medications,
          therapies, or medical interventions prescribed by qualified healthcare
          providers. Users should not discontinue, modify, or alter any current
          medical treatments or prescriptions based solely on information
          obtained from this website. Always consult with a qualified healthcare
          professional before making any changes to your medical regimen or
          treatment plan.
        </li>
      </ol>
      <ul className="unOrdered-list">
        <li className="unOrdered-list-item">
          We reserve the right to modify, update, or discontinue the content and
          services offered on the Website at any time.
        </li>
        <li className="unOrdered-list-item">
          By using the Website and participating in our customized diet plans,
          you agree to abide by the terms of this disclaimer and the Terms of
          Use of the Website.
        </li>
        <li className="unOrdered-list-item">
          If you do not agree with this disclaimer or any part of it, please
          refrain from using the Website and its services.
        </li>
        <li className="unOrdered-list-item">
          For any specific medical concerns or conditions, please consult a
          qualified healthcare professional before making dietary changes or
          following any recommendations.
        </li>
      </ul>
    </div>
  );
};

export default Disclaimer;
