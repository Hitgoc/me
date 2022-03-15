import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext, { ServingUrl } from "../../context/AuthContext";
import "./styles/profileMe.css";
import defaultImg from "../../pictures/default.png";

const ProfileMe = () => {
  const url = useContext(ServingUrl);

  const [dp, setDp] = useState();
  const [dpUrl, setDpUrl] = useState();

  const [dpUpdating, setDpUpdating] = useState(false);

  const imgPickHandler = (e) => {
    e.preventDefault();
    if (e.target.files.length === 1) {
      const pickedImg = e.target.files[0];
      setDp(pickedImg);
    }
  };

  useEffect(() => {
    if (!dp) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.readAsDataURL(dp);

    fileReader.onload = () => {
      setDpUpdating(true);

      fetch(`${url.localUrl}/uploads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageString: fileReader.result }),
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`${url.localUrl}/uploadId`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              imagePublicId: data.response.public_id,
            }),
          });

          window.location.reload();
        });
    };
  }, [dp]);

  const auth = useContext(AuthContext);

  const email = auth.email;

  const getDp = async () => {
    fetch(`${url.localUrl}/get-dp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.recentImgId) {
          let imgUrl = `${url.cloudUrl}/${data.recentImgId}`;
          setDpUrl(imgUrl);
        }
      });
  };

  if (email) {
    getDp();
  }

  const updateDpRef = useRef();

  const DPUpdateHandler = () => {
    updateDpRef.current.click();
  };

  return (
    <div>
      <MDBContainer className="mt-4 container">
        <MDBCard>
          <MDBCardBody>
            {!dpUpdating ? (
              <div>
                {dpUrl ? (
                  <div
                    id="dp"
                    className="dp"
                    style={{ backgroundImage: `url(${dpUrl})` }}
                  />
                ) : (
                  <div
                    id="defaultImg"
                    className="dp"
                    style={{ backgroundImage: `url(${defaultImg})` }}
                  />
                )}
              </div>
            ) : (
              <React.Fragment>
                <div id="spinner" className="dp">
                  <MDBSpinner />
                </div>
              </React.Fragment>
            )}
            <input
              onChange={imgPickHandler}
              ref={updateDpRef}
              type="file"
              style={{ display: "none" }}
            />
            <MDBBtn onClick={DPUpdateHandler} className="mt-4" block>
              Update picture
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default ProfileMe;
