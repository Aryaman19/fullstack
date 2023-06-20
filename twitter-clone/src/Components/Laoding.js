import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Laoding = () => {
	return (
		<div className='container' style={{ marginTop: "300px" }}>
			<BeatLoader color={"#00FFCA"} size={15} />
		</div>
	);
};

export default Laoding;
