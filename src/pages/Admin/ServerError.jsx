function ServerError() {
  return (
    <div className="d-flex align-items-center">
      <i className="fas fa-exclamation-triangle mt-1 mx-2 fs-4 text-danger"></i>
      <h2 className="my-5">Server on maintenance :C</h2>
    </div>
  );
}

export default ServerError;
