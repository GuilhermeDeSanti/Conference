var baseUrl = "{{('/conferences/1/speakers')}}";

window.onload = function () {
    const btnRegister = document.getElementById("btnRegister")
    btnRegister.addEventListener("click", function() {



        swal ({
            title: "Inscrição na WebConference",
            html:
                '<input id="txtName" class="swal2-input" placeholder="nome">' +
                '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById('txtName').value;
                const email = document.getElementById('txtEmail').value;
                const url_base = "https://fcawebbook.herokuapp.com";
                return;
                 fetch(`${url_Base}/conferences/1/participants/${email}`,{
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    method: "POST",
                    body: `nomeparticipant=${name}`
                 })
                 .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                 })
                 .catch(error => {
                    swal.showValidationError(`Pedido falhou: ${error}`);
                 });
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then(result => {
            if (result.value) {
                if (!result.value.err_code) {
                    swal({title: "Inscrição feita com sucesso!"});
                } else {
                    swal({title: `${result.value.err_message}`});
                }
            }
        });
    });





( async () => {
    const renderSpeakers = document.getElementById("renderSpeakers");
    let txtSpeakers = "";
    const response = await fetch(`${urlBase}/conferences/1/speakers`);
    newBase = url.substring(url.lastIndexOf("") + 1, url.length);
    const speakers = await response.json();

    
    for (const speaker of speakers) {
        txtSpeakers += `
        <div class="col-sm-4">
         <div class"team-member">
            <img class="mx-auto rounded-circle viewSpeaker" src="${speaker.foto}" alt="img" id="${speaker.idSpeaker}">
            <p class="text-muted">${speaker.cargo}</p>
            <ul class="list-inline social-buttons">`;

            if (speaker.twitter!==null) {
                txtSpeakers += `
                <li class="list-inline-item">
                 <a href="${speaker.twitter}" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
                </li>`;
            }
            if (speaker.facebook!==null) {
                txtSpeakers += `
                <li class="list-inline-item">
                    <a href="${speaker.facebook}" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </li>`;
            }

            if (speaker.linkedin!==null) {
                txtSpeakers += `
                <li class="list-inline-item">
                    <a href="${speaker.linkedin}" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </li>`;
            }

            txtSpeakers += `
            </ul>
        </div>
    </div>
    `;

    const btnView = document.getElementsByClassName("viewSpeaker");
    for (let i = 0; i < btnView.length; i++) {
        btnView[i].addEventListener("click", () => {
            if (speaker.idSpeaker == btnView[i].getAttribute("id")) {
                //janela modal
            }
        });
    }
    }
    swal ({
        title: speaker.nome,
        text: speaker.bio,
        imageUrl: speaker.foto,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Foto do orador',
        animation: false
    });

    renderSpeakers.innerHTML = txtSpeakers;
})();
}


    ( async () => {
        const renderSponsors = document.getElementById("renderSponsors");
        let txtSponsors = "";
        const response = await fetch(`${urlBase}/conferences/1/sponsors`);
        newBase = url.substring(url.lastIndexOf("") + 1, url.length);
        const sponsors = await response.json();

        for (const sponsor of sponsors) {
            txtSponsors += `
            <div class="col-md-3 col-sm-6">
            <a href="${sponsor.link}" target="_blank">
            <img class="img-fluid d-block mx-auto"
                src="${sponsor.logo}"
                alt="${sponsor.nome}">
            </a>
            </div>`;
        }
        renderSponsors.innerHTML = txtSponsors;
    }) ();

    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const response = await fetch(`${urlBase}/contacts/emails`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `email=${email}&name=${name}&subject=${message}`
        });
        const result = await response.json();
        if (result.value.success) {
            swal('Envio de mensagem', result.value.message.pt, 'success');
        } else {
            // Exibir modal com erro
        }
    });