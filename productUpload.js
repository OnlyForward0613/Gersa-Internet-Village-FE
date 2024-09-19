const https = require("https");
const FormData = require("form-data");
// const fetch = require("fetch");

const baseURL = "https://pricewards-test.herokuapp.com/api/v1";

// fetch(`${baseURL}/merchant/login`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     email: "echesisuccess01@gmail.com",
//     password: "test112233",
//   }),
// }).then((res) => res.json().then((data) => console.log(data)));

let somed;

var req = https.request(
  {
    hostname: "pricewards-test.herokuapp.com",
    path: "/api/v1/merchant/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
  (res) => {
    console.log("status code: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on("data", (d) => {
      console.log("response data", JSON.parse(d.toString()));

      let data = JSON.parse(d);

      var req2 = https.request(
        {
          hostname: "pricewards-test.herokuapp.com",
          path: "/api/v1/product",
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
        (res2) => {
          console.log("status code2", res2.statusCode);

          res2.on("data", (d) => {
            // console.log(d.toString());
          });
        }
      );

      req2.on("error", (e2) => {
        console.error(e2);
      });

      const newProduct = {
        // image: require("./public/images/1.jpg"),
        name: "Gray T-Shirt",
        merchant: data.merchant,
        price: 20,
        category: "62b59e65de07001f1835f032",
        description: "Nice polo shirt for men",
      };
      //   console.log(newProduct.image);
      const formData = new FormData();

      for (const [key, value] of Object.entries(newProduct)) {
        formData.append(key, value);
      }

      //   req2.write(formData);
      //   req2.end();
      req2.write(formData.toString());
    });
  }
);

req.on("error", (e) => {
  console.error(e);
});

req.write(
  JSON.stringify({ email: "echesisuccess01@gmail.com", password: "test112233" })
);

req.end();
