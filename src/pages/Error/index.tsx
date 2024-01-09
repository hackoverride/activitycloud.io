import "./404.scss";
export default function Error() {
  return (
    <div className="error">
      <img src="./404.png" alt="Error - not finding 404" />
      <h1>Oops! Page not found</h1>
      <p>
        We can't find the page you're looking for. Check out our{" "}
        <a href="/">homepage</a> or go back to the previous page.
      </p>
    </div>
  );
}
