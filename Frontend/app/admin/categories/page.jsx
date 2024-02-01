import "../providers/providers.scss";
import "./categories.scss";

const page = () => {
  return (
    <>
      <h3 className="categories_heading">Categories</h3>
      <div className="categories_container">
        <div className="category_form ">
          <div className="category_heading">
            <h3>Category</h3>
          </div>
          <hr />
          <form action="Post">
            <input type="text" placeholder="Name of the category" />
            <select name="" id="">
              <option value="">Category</option>
              <option value="">Sub-category</option>
            </select>
            <input type="file" />
          </form>
        </div>
        <div className="providers_container">
          <div className="providers_heading">
            <h3>Categories</h3>
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
    </>
  );
};

export default page;
