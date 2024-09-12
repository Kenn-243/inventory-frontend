import Swal from "sweetalert2";

export default function SuccessPopup() {
  return Swal.fire({
    icon: "success",
    title: "Success!",
  });
}
