export default {
    update(el, binding) {
        if (binding.value) {
            el.classList.add("bg-primary", "text-white");
        } else {
            el.classList.remove("bg-primary", "text-white");
        }
    }
}