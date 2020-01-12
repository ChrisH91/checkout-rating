export default () => (
  <form>
    <input type="text" name="name" placeholder="Name" />
    <input type="text" name="email" placeholder="Email address" />
    <input type="text" name="rating" placeholder="Rating" />
    <textarea placeholder="Comments" />

    <style jsx>
      {`
        form {
          display: flex;
          flex-direction: column;
        }
      `}
    </style>
  </form>
)