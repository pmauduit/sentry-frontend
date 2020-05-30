package fr.spironet.sentryfrontend.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

@Controller
@RequestMapping("/")
class DefaultController {
    @RequestMapping(method = RequestMethod.GET)
    String defaultController() {
       return "redirect:/index.html"
    }
}
