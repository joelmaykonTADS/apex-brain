import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState( {
    name: "",
    email: "",
    message: "",
  } );

  const [loading, setLoading] = useState( false );

  const handleChange = ( e ) => {
    const { target } = e;
    const { name, value } = target;

    setForm( {
      ...form,
      [name]: value,
    } );
  };

  const handleSubmit = ( e ) => {
    e.preventDefault();
    setLoading( true );

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Meu portifólio",
          from_email: form.email,
          to_email: "joelmaykon94@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading( false );
          alert( "Thank you. I will get back to you as soon as possible." );

          setForm( {
            name: "",
            email: "",
            message: "",
          } );
        },
        ( error ) => {
          setLoading( false );
          console.error( error );

          alert( "Ahh, something went wrong. Please try again." );
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn( "left", "tween", 0.2, 1 )}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>redes sociais</p>
        <h3 className={styles.sectionHeadText}>Contato.</h3>

        <div className="grid place-items-center">
          <span>
            <h4><b>Email: </b>joelmaykon@gmail.com</h4>
            <h4><b>Linkedin: </b> <a href="https://www.linkedin.com/in/joelmaykon/"><u>in/joelmaykon</u></a></h4>
          </span>

          <img src="https://media.licdn.com/dms/image/D4D03AQGzebhXD1HT5w/profile-displayphoto-shrink_800_800/0/1687971502759?e=2147483647&v=beta&t=W8by9n06w31RpQ2_G0RNzwDOUxmSaL25btgJB8L_HQE" width={"250px"} alt="..." className="pt-5 shadow rounded-full items-center border-none " />
        </div>
      </motion.div>

      <motion.div
        variants={slideIn( "right", "tween", 0.2, 1 )}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[300px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper( Contact, "contact" );