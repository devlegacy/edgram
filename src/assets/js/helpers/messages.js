export const errorMsg = (msg, err) => {
  console.error(err);

  return `
    <div class="message-error">
      <p>[Error]: <b>${msg}</b> <i class="far fa-frown-open"></i></p>
    </div>
  `;
};

export const successMsg = (msg) => {
  return `
    <div class="message-success">
      <p>[Éxito]: <b>${msg}</b> <i class="fas fa-smile-beam"></i></p>
    </div>
  `;
}
