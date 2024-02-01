import "../providers/providers.scss";
import "../categories/categories.scss";
import "./service.scss";
const page = () => {
  return (
    <div className="service_container">
      <h3>Services</h3>
      <form action="POST">
        <div className="service_form_row">
          <div className="service_form_col">
            <h4>Add service details</h4>
            <div className="input_row">
              <select>
                <option value="">Select provider</option>
              </select>
              <select>
                <option value="">Select category</option>
              </select>
            </div>
            <div className="input_row">
              <input type="text" placeholder="Title of the service" />
              <input type="text" placeholder="Tags" />
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
            ></textarea>
            <input type="file" placeholder="Image" />
          </div>
          <div className="service_form_col">
            <h4>Perform task</h4>

            <input type="number" placeholder="Duration" />
            <input
              type="text"
              placeholder="Members required to perform task "
            />
            <input type="text" placeholder="Title of the service" />
          </div>
        </div>
        <div className="service_form_row">
          <div className="service_form_col">
            <h4>Price details</h4>
            <div className="input_row">
              <select>
                <option value="">Tax excluded</option>
                <option value="">Tax included</option>
              </select>
              <select>
                <option value="">Select tax</option>
                <option value="">GST (5%)</option>
                <option value="">GST (9%)</option>
                <option value="">GST (12%)</option>
                <option value="">GST (18%)</option>
                <option value="">GST (28%)</option>
              </select>
              <input type="text" />
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="service_form_row">
          <div className="service_form_col">
            <h4>Service options</h4>
            <div className="input_row">
              <div className="service_checkbox">
                <input type="checkbox" />
                <label htmlFor="">Cancelable</label>
              </div>
              <div className="service_checkbox">
                <input type="checkbox" />
                <label htmlFor="">Pay later</label>
              </div>
              <div className="service_checkbox">
                <input type="checkbox" />
                <label htmlFor="">Status</label>
              </div>
            </div>
          </div>
        </div>
        <button type="Submit">Save</button>
      </form>
      <div className="categories_container">
        <div className="providers_container">
          <h3>All services</h3>
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
  );
};

export default page;
