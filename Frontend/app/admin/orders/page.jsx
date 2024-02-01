import "../providers/providers.scss";

const page = () => {
  return (
    <div className="providers_container">
      <h3>Orders</h3>
      <div className="providers_heading">
        <select name="" id="">
          <option value="">Awaiting</option>
          <option value="">Confirmed</option>
          <option value="">Rescheduled</option>
          <option value="">Cancelled</option>
          <option value="">Completed</option>
        </select>
        <input type="search" placeholder="Search" />
      </div>
      <hr />
      <div className="providers_heading"></div>
      <table className="table">
        <thead>
          <tr className="table_head">
            <th>Profile</th>
            <th>Company Name</th>
            <th>Mobile</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table_body">
            <td>The Sliding</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
