let strHtml = `
<thead >
 <tr><th class='w-100 text-center bg-warning' colspan='4'>
   Lista de participantes</th>
 </tr>
 <tr class='bg-info'>
   <th class='w-2'>#</th>
   <th class='w-50'>Nome</th>
   <th class='w-38'>E-mail</th>
   <th class='w-10'>Ações</th>
 </tr>
</thead><tbody>`;

const renderParticipants = async () => {
    const urlBase = "https://gleeful-boba-ce24e0.netlify.app/admin/startbootstrap-sb-admin-gh-pages/tables.html";
    const tblParticipants = document.getElementById("tblParticipants");
};

const response = await fetch(`${urlBase}/conferences/1/participants`);
const participants = await response.json();

let i = 1;
for (const participant of participants) {
    strHtml += `
    <tr>
      <td>${i}</td>
      <td>${participant.nomeParticipante}</td>
      <td>${participant.idParticipant}</td>
      <td><i id='${participant.idParticipant}' class='fas fa-trash-alt remove'></i>
      </td>
    </tr>
    `;
    i++;
}
strHtml += `</tbody>`;
tblParticipants.innerHTML = strHtml;