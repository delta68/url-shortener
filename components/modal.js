export default function Modal({
  id,
  title,
  bodyJSX,
  footer: {
    saveBtn: { saveTitle, onSave } = {},
    cancelBtn: { cancelTitle, onCancel } = {},
  } = {},
}) {
  return (
    <div className="modal" id={id}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">{bodyJSX}</section>
        {saveTitle || cancelTitle ? (
          <footer className="modal-card-foot">
            {saveTitle ? (
              <button className="button is-success" onClick={onSave}>
                {saveTitle}
              </button>
            ) : (
              ""
            )}
            {cancelTitle ? (
              <button className="button" onClick={onCancel}>
                {cancelTitle}
              </button>
            ) : (
              ""
            )}
          </footer>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
