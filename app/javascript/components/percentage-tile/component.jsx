import PropTypes from "prop-types";

const PercentageTile = ({ label, percentage, count, color }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        textAlign: "center",
        backgroundColor: color,
        flex: "1",
        margin: "0 5px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px"
          }}
        >
          <h2
            style={{
              marginRight: "5px",
              fontSize: "30px",
              fontWeight: "bold",
              color: "white"
            }}
          >
            {percentage}%
          </h2>
          <p
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
              margin: 0
            }}
          >
            ({count})
          </p>
        </div>
        <p style={{ margin: 0, color: "white", fontSize: "20px", fontWeight: "bold" }}>{label}</p>
      </div>
    </div>
  );
};

PercentageTile.displayName = "PercentageTile";

PercentageTile.propTypes = {
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired
};

export default PercentageTile;
