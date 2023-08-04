function Modal({
  doThis = () => {},
  iconClass = "fa fa-database mx-2",
  btnClass = "btn btn-primary",
  btnTitle = "",
  title = "Launch modal",
  mKey = "",
}) {
  return (
    <>
      <button
        type="button"
        className={btnClass}
        data-bs-toggle="modal"
        data-bs-target={`#staticBackdrop${mKey}`}
      >
        <i className={iconClass}></i>
        {btnTitle}
      </button>

      <div
        className="modal fade"
        id={`staticBackdrop${mKey}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark mt-2 w-100 titles-commerce rounded-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  doThis();
                }}
              >
                <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
