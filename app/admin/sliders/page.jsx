import "../providers/providers.scss";
import "../categories/categories.scss";
import "../services/service.scss";
import PrivateRoute from "../../../Routes/AdminRoute";

const page = () => {
  return (
    <PrivateRoute>
      <div className="service_container">
        <h3>Sliders</h3>
        <form action="POST">
          <div className="service_form_row">
            <div className="service_form_col">
              <h4>Add new slider</h4>
              <div className="input_row">
                <select>
                  <option value="">Select provider</option>
                </select>
              </div>
              <input type="file" placeholder="Image" />
            </div>
          </div>

          <button type="Submit">Save</button>
        </form>
        <div className="categories_container">
          <div className="providers_container">
            <h4>All sliders</h4>
            <div className="providers_heading">
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
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
