const Mask = {
  apply(input, func) {
    setTimeout(function(){
        // = Mask.formatBRL, ou qualquer outra função dentro de Mask
        input.value = Mask[func](input.value) 
        //Após  1 ms, a função pega o value do input e executa a função formatBR
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g,"")

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', //1.000.00
      currency: 'BRL'
    }).format(value/100)
  }
}

const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target
    
    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      
      PhotosUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => { //Quando o arquivo estiver pronto, executa a arrow function
        const image = new Image()
        image.src = String(reader.result)
        

        const div = PhotosUpload.getContainer(image)

        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file) // Quando carregado, executa a função onload
    })
  },
  hasLimit(event) {
    const { uploadLimit } = PhotosUpload
    const { files: fileList } = event.target

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    return false
  },
  getContainer(image) {
    const div = document.createElement('div')
        div.classList.add('photo') //Adiciona a classe 'photo' na div

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')

    button.innerHTML = "close"

    return button

  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    photoDiv.remove()
  }
}
