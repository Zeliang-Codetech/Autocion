import "../providers/providers.scss";
import "../categories/categories.scss";
import "./featured.scss";
import PrivateRoute from "../../../Routes/AdminRoute";
const page = () => {
  return (
    <>
      <PrivateRoute>
        <h3 className="categories_heading">Featured section</h3>
        <div className="categories_container">
          <div className="category_form ">
            <div className="category_heading">
              <h3>Add featured section</h3>
            </div>
            <hr />
            <form action="Post">
              <input type="text" placeholder="Title" />
              <select name="" id="">
                <option value="">Section type</option>
                <option value="">Category</option>
                <option value="">Custom provider</option>
                <option value="">Top rated provider</option>
              </select>
              <p style={{ paddingTop: "0.1rem", paddingBottom: "0.1rem" }}>
                Status
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  className="featured_radio"
                  style={{ backgroundColor: "#01b7de" }}
                >
                  <input name="featured" type="radio" />
                  <label htmlFor="">Active</label>
                </div>
                <div
                  className="featured_radio"
                  style={{ backgroundColor: "red" }}
                >
                  <input name="featured" type="radio" />
                  <label htmlFor="">Unactive</label>
                </div>
              </div>
              <input type="file" />
            </form>
          </div>
          <div className="providers_container">
            <div className="providers_heading">
              <h3>All featured section</h3>
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
      </PrivateRoute>
    </>
  );
};

export default page;
