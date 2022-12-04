import { requestSystemDict } from "../../api/apis";

Page({
  getData() {
    requestSystemDict().then(res => {
      console.log(res);
    })
  }
})