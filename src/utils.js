module.exports = {
    hourToMinutes: (hourMinutes) => {
        const [hour, minutes] = hourMinutes.split(':')
        return parseInt(parseInt(hour) * 60 + parseInt(minutes))
    },
    removeCharacteresCPF: (cpf) => {
        return cpf.replace(/[^0-9]/g, "")
    }
}