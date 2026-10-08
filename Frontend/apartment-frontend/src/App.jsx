import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8083";

function App() {
  const [page, setPage] = useState("dashboard");

  const [apartments, setApartments] = useState([]);
  const [residents, setResidents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestDetails, setRequestDetails] = useState([]);
  const [payments, setPayments] = useState([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [apartmentForm, setApartmentForm] = useState({
    apartmentNumber: "",
    blockName: "",
    maintenanceCharge: ""
  });

  const [residentForm, setResidentForm] = useState({
    residentName: "",
    email: "",
    phone: "",
    apartmentId: ""
  });

  const [requestForm, setRequestForm] = useState({
    residentId: "",
    apartmentId: "",
    description: "",
    requestDate: "",
    estimatedCost: ""
  });

  const [paymentForm, setPaymentForm] = useState({
    residentId: "",
    apartmentId: "",
    amountPaid: "",
    paymentDate: ""
  });

  const [outstanding, setOutstanding] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    try {
      const apartmentResponse = await fetch(`${API}/apartments`);
      const residentResponse = await fetch(`${API}/residents`);
      const requestResponse = await fetch(
        `${API}/maintenance-requests`
      );
      const detailResponse = await fetch(
        `${API}/maintenance-requests/details`
      );
      const paymentResponse = await fetch(`${API}/payments`);

      setApartments(await apartmentResponse.json());
      setResidents(await residentResponse.json());
      setRequests(await requestResponse.json());
      setRequestDetails(await detailResponse.json());
      setPayments(await paymentResponse.json());

    } catch (error) {
      console.error("Error loading data:", error);

      setMessage("Unable to load data from server");
      setMessageType("error");
    }
  }

  async function addApartment(e) {
    e.preventDefault();

    if (
      !apartmentForm.apartmentNumber ||
      !apartmentForm.blockName ||
      !apartmentForm.maintenanceCharge
    ) {
      setMessage("Please fill all apartment fields");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API}/apartments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apartmentNumber: apartmentForm.apartmentNumber,
          blockName: apartmentForm.blockName,
          maintenanceCharge: Number(
            apartmentForm.maintenanceCharge
          )
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add apartment");
      }

      setApartmentForm({
        apartmentNumber: "",
        blockName: "",
        maintenanceCharge: ""
      });

      setMessage("Apartment added successfully");
      setMessageType("success");

      loadAllData();

    } catch (error) {
      console.error(error);

      setMessage("Failed to add apartment");
      setMessageType("error");
    }
  }

  async function addResident(e) {
    e.preventDefault();

    if (
      !residentForm.residentName ||
      !residentForm.email ||
      !residentForm.phone ||
      !residentForm.apartmentId
    ) {
      setMessage("Please fill all resident fields");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API}/residents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          residentName: residentForm.residentName,
          email: residentForm.email,
          phone: residentForm.phone,
          apartmentId: Number(residentForm.apartmentId)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add resident");
      }

      setResidentForm({
        residentName: "",
        email: "",
        phone: "",
        apartmentId: ""
      });

      setMessage("Resident added successfully");
      setMessageType("success");

      loadAllData();

    } catch (error) {
      console.error(error);

      setMessage("Failed to add resident");
      setMessageType("error");
    }
  }

  async function addRequest(e) {
    e.preventDefault();

    if (
      !requestForm.residentId ||
      !requestForm.apartmentId ||
      !requestForm.description ||
      !requestForm.requestDate ||
      !requestForm.estimatedCost
    ) {
      setMessage("Please fill all request fields");
      setMessageType("error");
      return;
    }

    try {
      const params = new URLSearchParams({
        residentId: requestForm.residentId,
        apartmentId: requestForm.apartmentId,
        description: requestForm.description,
        requestDate: requestForm.requestDate,
        estimatedCost: requestForm.estimatedCost
      });

      const response = await fetch(
        `${API}/maintenance-requests/create-by-procedure?${params}`,
        {
          method: "POST"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create request");
      }

      setRequestForm({
        residentId: "",
        apartmentId: "",
        description: "",
        requestDate: "",
        estimatedCost: ""
      });

      setMessage("Maintenance request created successfully");
      setMessageType("success");

      loadAllData();

    } catch (error) {
      console.error(error);

      setMessage("Failed to create maintenance request");
      setMessageType("error");
    }
  }

  async function addPayment(e) {
    e.preventDefault();

    if (
      !paymentForm.residentId ||
      !paymentForm.apartmentId ||
      !paymentForm.amountPaid ||
      !paymentForm.paymentDate
    ) {
      setMessage("Please fill all payment fields");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          residentId: Number(paymentForm.residentId),
          apartmentId: Number(paymentForm.apartmentId),
          amountPaid: Number(paymentForm.amountPaid),
          paymentDate: paymentForm.paymentDate
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add payment");
      }

      setPaymentForm({
        residentId: "",
        apartmentId: "",
        amountPaid: "",
        paymentDate: ""
      });

      setMessage("Payment added successfully");
      setMessageType("success");

      loadAllData();

    } catch (error) {
      console.error(error);

      setMessage("Failed to add payment");
      setMessageType("error");
    }
  }

  async function calculateOutstanding(apartmentId) {
    try {
      const response = await fetch(
        `${API}/payments/outstanding/${apartmentId}`
      );

      if (!response.ok) {
        throw new Error("Failed to calculate outstanding amount");
      }

      const result = await response.json();

      setOutstanding({
        apartmentId: apartmentId,
        amount: result
      });

    } catch (error) {
      console.error(error);

      setMessage("Failed to calculate outstanding amount");
      setMessageType("error");
    }
  }

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <h1>Apartment Maintenance System</h1>
      </header>

      <div className="layout">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="sidebar-title">
            AMS
          </div>

          <p className="menu-title">
            MAIN MENU
          </p>

          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            <span className="menu-icon">🏠</span>
            <span>Dashboard</span>
          </button>

          <button
            className={page === "apartments" ? "active" : ""}
            onClick={() => setPage("apartments")}
          >
            <span className="menu-icon">🏢</span>
            <span>Apartments</span>
          </button>

          <button
            className={page === "residents" ? "active" : ""}
            onClick={() => setPage("residents")}
          >
            <span className="menu-icon">👥</span>
            <span>Residents</span>
          </button>

          <button
            className={page === "requests" ? "active" : ""}
            onClick={() => setPage("requests")}
          >
            <span className="menu-icon">🔧</span>
            <span>Maintenance Requests</span>
          </button>

          <button
            className={page === "payments" ? "active" : ""}
            onClick={() => setPage("payments")}
          >
            <span className="menu-icon">💳</span>
            <span>Payments</span>
          </button>

        </aside>

        {/* MAIN CONTENT */}

        <main className="content">

          {message && (
            <div className={`message ${messageType}`}>
              {messageType === "success" ? "✅ " : "❌ "}
              {message}
            </div>
          )}

          {page === "dashboard" && (
            <Dashboard
              apartments={apartments}
              residents={residents}
              requests={requests}
              payments={payments}
            />
          )}

          {page === "apartments" && (
            <Apartments
              apartments={apartments}
              residents={residents}
              form={apartmentForm}
              setForm={setApartmentForm}
              addApartment={addApartment}
            />
          )}

          {page === "residents" && (
            <Residents
              residents={residents}
              apartments={apartments}
              form={residentForm}
              setForm={setResidentForm}
              addResident={addResident}
            />
          )}

          {page === "requests" && (
            <Requests
              requests={requests}
              details={requestDetails}
              residents={residents}
              apartments={apartments}
              form={requestForm}
              setForm={setRequestForm}
              addRequest={addRequest}
            />
          )}

          {page === "payments" && (
            <Payments
              payments={payments}
              residents={residents}
              apartments={apartments}
              form={paymentForm}
              setForm={setPaymentForm}
              addPayment={addPayment}
              calculateOutstanding={calculateOutstanding}
              outstanding={outstanding}
            />
          )}

        </main>

      </div>

    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({
  apartments,
  residents,
  requests,
  payments
}) {

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const totalPayments = payments.reduce(
    (total, payment) =>
      total + Number(payment.amountPaid || 0),
    0
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h2>Dashboard</h2>

          <p>
            Overview of your apartment maintenance system
          </p>
        </div>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            🏢
          </div>

          <div>
            <p>Total Apartments</p>
            <h3>{apartments.length}</h3>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-icon">
            👥
          </div>

          <div>
            <p>Total Residents</p>
            <h3>{residents.length}</h3>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-icon">
            🔧
          </div>

          <div>
            <p>Total Requests</p>
            <h3>{requests.length}</h3>
          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-icon">
            💰
          </div>

          <div>
            <p>Total Payments</p>
            <h3>₹{totalPayments}</h3>
          </div>

        </div>

      </div>

      <div className="dashboard-section">

        <h3>
          Maintenance Request Summary
        </h3>

        <div className="request-summary">

          <div className="summary-box">

            <span>⏳</span>

            <div>
              <p>Pending</p>
              <strong>{pendingRequests}</strong>
            </div>

          </div>

          <div className="summary-box">

            <span>✅</span>

            <div>
              <p>Completed</p>
              <strong>{completedRequests}</strong>
            </div>

          </div>

          <div className="summary-box">

            <span>📋</span>

            <div>
              <p>Total Requests</p>
              <strong>{requests.length}</strong>
            </div>

          </div>

        </div>

      </div>

      <div className="dashboard-section">

        <h3>
          Recent Maintenance Requests
        </h3>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Estimated Cost</th>
            </tr>

          </thead>

          <tbody>

            {requests
              .slice(-5)
              .reverse()
              .map((request) => (

                <tr key={request.requestId}>

                  <td>
                    {request.requestId}
                  </td>

                  <td>
                    {request.requestDescription}
                  </td>

                  <td>
                    {request.requestDate}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        request.status
                          ?.toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {request.status}
                    </span>

                  </td>

                  <td>
                    ₹{request.estimatedCost}
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* =====================================================
   APARTMENTS
===================================================== */

function Apartments({
  apartments,
  residents,
  form,
  setForm,
  addApartment
}) {

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [aboveAverageApartments, setAboveAverageApartments] =
    useState([]);

  const [loadingAboveAverage, setLoadingAboveAverage] =
    useState(false);


  /*
   * Load apartments whose maintenance charge
   * is above the average.
   *
   * This uses the BACKEND subquery:
   *
   * /apartments/above-average
   */

  async function loadAboveAverage() {

    try {

      setLoadingAboveAverage(true);

      const response = await fetch(
        `${API}/apartments/above-average`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load above-average apartments"
        );
      }

      const data = await response.json();

      setAboveAverageApartments(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingAboveAverage(false);

    }
  }


  /*
   * Normal search
   */

  let filteredApartments = apartments.filter(
    (apartment) => {

      const apartmentNumber =
        apartment.apartmentNumber || "";

      const blockName =
        apartment.blockName || "";

      const searchText =
        search.toLowerCase();

      return (
        apartmentNumber
          .toLowerCase()
          .includes(searchText) ||

        blockName
          .toLowerCase()
          .includes(searchText)
      );

    }
  );


  /*
   * Apply block / above-average filter
   */

  if (filter !== "All" && filter !== "Above Average") {

    filteredApartments =
      filteredApartments.filter(
        (apartment) =>
          apartment.blockName === filter
      );

  }


  /*
   * IMPORTANT:
   *
   * When Above Average is selected,
   * use the data returned by the backend.
   */

  if (filter === "Above Average") {

    filteredApartments =
      aboveAverageApartments.filter(
        (apartment) => {

          const apartmentNumber =
            apartment.apartmentNumber || "";

          const blockName =
            apartment.blockName || "";

          const searchText =
            search.toLowerCase();

          return (
            apartmentNumber
              .toLowerCase()
              .includes(searchText) ||

            blockName
              .toLowerCase()
              .includes(searchText)
          );

        }
      );

  }


  /*
   * Get unique block names
   */

  const blocks = [
    ...new Set(
      apartments.map(
        (apartment) =>
          apartment.blockName
      )
    )
  ];


  /*
   * Calculate average for displaying
   */

  const averageCharge =
    apartments.length > 0
      ? apartments.reduce(
          (total, apartment) =>
            total +
            Number(
              apartment.maintenanceCharge || 0
            ),
          0
        ) / apartments.length
      : 0;


  return (

    <div>

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h2>
            Apartments
          </h2>

          <p>
            Manage apartment details and
            maintenance charges
          </p>

        </div>

      </div>


      {/* ADD APARTMENT FORM */}

      <form
        onSubmit={addApartment}
        className="form"
      >

        <input
          placeholder="Apartment Number"
          value={form.apartmentNumber}
          onChange={(e) =>
            setForm({
              ...form,
              apartmentNumber:
                e.target.value
            })
          }
        />

        <input
          placeholder="Block Name"
          value={form.blockName}
          onChange={(e) =>
            setForm({
              ...form,
              blockName:
                e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Maintenance Charge"
          value={form.maintenanceCharge}
          onChange={(e) =>
            setForm({
              ...form,
              maintenanceCharge:
                e.target.value
            })
          }
        />

        <button type="submit">
          Add Apartment
        </button>

      </form>


      {/* SEARCH */}

      <div className="apartment-tools">

        <div className="search-box">

          🔍

          <input
            type="text"
            placeholder="Search apartment..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {/* FILTER BUTTONS */}

      <div className="filter-buttons">

        <button
          className={
            filter === "All"
              ? "filter-active"
              : ""
          }
          onClick={() =>
            setFilter("All")
          }
        >
          All
        </button>


        {blocks.map((block) => (

          <button
            key={block}
            className={
              filter === block
                ? "filter-active"
                : ""
            }
            onClick={() =>
              setFilter(block)
            }
          >
            {block}
          </button>

        ))}


        <button
          className={
            filter === "Above Average"
              ? "filter-active"
              : ""
          }
          onClick={() => {

            setFilter("Above Average");

            loadAboveAverage();

          }}
        >
          Above Average
        </button>

      </div>


      {/* AVERAGE INFORMATION */}

      {apartments.length > 0 && (

        <div className="average-info">

          Average Maintenance Charge:

          <strong>
            ₹{averageCharge.toFixed(2)}
          </strong>

        </div>

      )}


      {/* LOADING */}

      {filter === "Above Average" &&
        loadingAboveAverage && (

          <div className="loading">
            Loading above-average apartments...
          </div>

        )}


      {/* APARTMENT TABLE */}

      {!loadingAboveAverage &&
      filteredApartments.length > 0 ? (

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Apartment</th>

              <th>Block</th>

              <th>
                Maintenance Charge
              </th>

              <th>
                Residents
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredApartments.map(
              (apartment) => {

                const residentCount =
                  residents.filter(
                    (resident) =>
                      Number(
                        resident.apartmentId
                      ) ===
                      Number(
                        apartment.apartmentId
                      )
                  ).length;


                return (

                  <tr
                    key={
                      apartment.apartmentId
                    }
                  >

                    <td>
                      {apartment.apartmentId}
                    </td>

                    <td>

                      <strong>
                        {
                          apartment.apartmentNumber
                        }
                      </strong>

                    </td>

                    <td>
                      {apartment.blockName}
                    </td>

                    <td>
                      ₹
                      {
                        apartment.maintenanceCharge
                      }
                    </td>

                    <td>
                      {residentCount}
                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>

      ) : (

        !loadingAboveAverage && (

          <div className="empty-state">

            <div>🏢</div>

            <h3>
              No apartments found
            </h3>

            <p>
              Try a different search
              or filter.
            </p>

          </div>

        )

      )}

    </div>

  );
}


/* =====================================================
   RESIDENTS
===================================================== */

function Residents({
  residents,
  apartments,
  form,
  setForm,
  addResident
}) {

  return (

    <div>

      <h2>Residents</h2>

      <form
        onSubmit={addResident}
        className="form"
      >

        <input
          placeholder="Resident Name"
          value={form.residentName}
          onChange={(e) =>
            setForm({
              ...form,
              residentName:
                e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value
            })
          }
        />

        <select
          value={form.apartmentId}
          onChange={(e) =>
            setForm({
              ...form,
              apartmentId:
                e.target.value
            })
          }
        >

          <option value="">
            Select Apartment
          </option>

          {apartments.map(
            (apartment) => (

              <option
                key={
                  apartment.apartmentId
                }
                value={
                  apartment.apartmentId
                }
              >
                {
                  apartment.apartmentNumber
                }
              </option>

            )
          )}

        </select>

        <button type="submit">
          Add Resident
        </button>

      </form>


      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Apartment ID</th>

          </tr>

        </thead>

        <tbody>

          {residents.map(
            (resident) => (

              <tr
                key={
                  resident.residentId
                }
              >

                <td>
                  {resident.residentId}
                </td>

                <td>
                  {resident.residentName}
                </td>

                <td>
                  {resident.email}
                </td>

                <td>
                  {resident.phone}
                </td>

                <td>
                  {resident.apartmentId}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );
}


/* =====================================================
   MAINTENANCE REQUESTS
===================================================== */

function Requests({
  requests,
  details,
  residents,
  apartments,
  form,
  setForm,
  addRequest
}) {

  return (

    <div>

      <h2>
        Maintenance Requests
      </h2>


      <form
        onSubmit={addRequest}
        className="form"
      >

        <select
          value={form.residentId}
          onChange={(e) =>
            setForm({
              ...form,
              residentId:
                e.target.value
            })
          }
        >

          <option value="">
            Select Resident
          </option>

          {residents.map(
            (resident) => (

              <option
                key={
                  resident.residentId
                }
                value={
                  resident.residentId
                }
              >
                {
                  resident.residentName
                }
              </option>

            )
          )}

        </select>


        <select
          value={form.apartmentId}
          onChange={(e) =>
            setForm({
              ...form,
              apartmentId:
                e.target.value
            })
          }
        >

          <option value="">
            Select Apartment
          </option>

          {apartments.map(
            (apartment) => (

              <option
                key={
                  apartment.apartmentId
                }
                value={
                  apartment.apartmentId
                }
              >
                {
                  apartment.apartmentNumber
                }
              </option>

            )
          )}

        </select>


        <input
          placeholder="Request Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value
            })
          }
        />


        <input
          type="date"
          value={form.requestDate}
          onChange={(e) =>
            setForm({
              ...form,
              requestDate:
                e.target.value
            })
          }
        />


        <input
          type="number"
          placeholder="Estimated Cost"
          value={form.estimatedCost}
          onChange={(e) =>
            setForm({
              ...form,
              estimatedCost:
                e.target.value
            })
          }
        />


        <button type="submit">
          Create Request
        </button>

      </form>


      <h3>
        Request Details — JOIN Query
      </h3>


      <table>

        <thead>

          <tr>

            <th>Request ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Resident</th>
            <th>Apartment</th>
            <th>Block</th>

          </tr>

        </thead>

        <tbody>

          {details.map(
            (row, index) => (

              <tr key={index}>

                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>

                <td>

                  <span
                    className={`status ${
                      row[3]
                        ?.toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {row[3]}
                  </span>

                </td>

                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );
}


/* =====================================================
   PAYMENTS
===================================================== */

function Payments({
  payments,
  residents,
  apartments,
  form,
  setForm,
  addPayment,
  calculateOutstanding,
  outstanding
}) {

  return (

    <div>

      <h2>Payments</h2>


      <form
        onSubmit={addPayment}
        className="form"
      >

        <select
          value={form.residentId}
          onChange={(e) =>
            setForm({
              ...form,
              residentId:
                e.target.value
            })
          }
        >

          <option value="">
            Select Resident
          </option>

          {residents.map(
            (resident) => (

              <option
                key={
                  resident.residentId
                }
                value={
                  resident.residentId
                }
              >
                {
                  resident.residentName
                }
              </option>

            )
          )}

        </select>


        <select
          value={form.apartmentId}
          onChange={(e) =>
            setForm({
              ...form,
              apartmentId:
                e.target.value
            })
          }
        >

          <option value="">
            Select Apartment
          </option>

          {apartments.map(
            (apartment) => (

              <option
                key={
                  apartment.apartmentId
                }
                value={
                  apartment.apartmentId
                }
              >
                {
                  apartment.apartmentNumber
                }
              </option>

            )
          )}

        </select>


        <input
          type="number"
          placeholder="Amount Paid"
          value={form.amountPaid}
          onChange={(e) =>
            setForm({
              ...form,
              amountPaid:
                e.target.value
            })
          }
        />


        <input
          type="date"
          value={form.paymentDate}
          onChange={(e) =>
            setForm({
              ...form,
              paymentDate:
                e.target.value
            })
          }
        />


        <button type="submit">
          Add Payment
        </button>

      </form>


      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Resident ID</th>
            <th>Apartment ID</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>

          </tr>

        </thead>

        <tbody>

          {payments.map(
            (payment) => (

              <tr
                key={
                  payment.paymentId
                }
              >

                <td>
                  {payment.paymentId}
                </td>

                <td>
                  {payment.residentId}
                </td>

                <td>
                  {payment.apartmentId}
                </td>

                <td>
                  ₹{payment.amountPaid}
                </td>

                <td>
                  {payment.paymentDate}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>


      <h3>
        Calculate Outstanding Amount
      </h3>


      {apartments.map(
        (apartment) => (

          <div
            className="outstanding"
            key={
              apartment.apartmentId
            }
          >

            <span>
              {
                apartment.apartmentNumber
              }
            </span>

            <button
              onClick={() =>
                calculateOutstanding(
                  apartment.apartmentId
                )
              }
            >
              Calculate Outstanding
            </button>

          </div>

        )
      )}


      {outstanding && (

        <div className="result">

          Outstanding amount for
          Apartment ID{" "}

          {outstanding.apartmentId}

          :

          <strong>
            ₹{outstanding.amount}
          </strong>

        </div>

      )}

    </div>

  );
}


export default App;