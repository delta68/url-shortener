export default function Box({
  onSubmit = null,
  output = null,
  copyURL = null,
}) {
  return (
    <div
      className="box is-flex is-flex-direction-column has-text-centered "
      style={{ maxWidth: "700px", minWidth: "450px" }}
    >
      <h1 className="title mb-5 is-uppercase">minify url</h1>
      <div className="expire is-flex is-justify-content-space-between is-align-items-center">
        <label htmlFor="expireTime">Expire After</label>
        <div className="select is-primary">
          <select name="expireTime" id="expireTime" defaultValue="36000">
            <option value="3600">1 hour</option>
            <option value="7200">2 hours</option>
            <option value="36000">10 hours</option>
            <option value="86400">1 day</option>
            <option value="172800">2 days</option>
            <option value="604800">1 week</option>
            <option value="2629746">1 month</option>
            <option value="31556952">1 year</option>
          </select>
        </div>
      </div>
      <input
        type="text"
        className="input is-primary my-4"
        name="inp-url"
        id="inp-url"
        placeholder="Input url"
      />
      {output ? (
        <div className="control has-icons-right">
          <input
            type="text"
            className="input is-primary mb-4 hover-pointer"
            name="out-url"
            id="out-url"
            placeholder="Output url"
            value={output ? output : ""}
            readOnly={true}
            data-target="out-url"
            onClick={copyURL}
          />
          <span className="icon is-right">
            <i className="fa-solid fa-copy" />
          </span>
        </div>
      ) : (
        ""
      )}
      <button
        data-target="inp-url"
        onClick={onSubmit}
        className="button is-capitalized is-primary has-text-dark has-text-weight-medium"
      >
        submit
      </button>
    </div>
  );
}
