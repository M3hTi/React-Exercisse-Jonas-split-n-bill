function Form({ children, className, onSubmitHandler }) {
  return <form className={className} onSubmit={onSubmitHandler}>{children}</form>;
}

export default Form;
