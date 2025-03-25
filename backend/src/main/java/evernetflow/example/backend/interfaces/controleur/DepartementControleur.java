package evernetflow.example.backend.interfaces.controleur;


import evernetflow.example.backend.application.dto.DepartementDto;
import evernetflow.example.backend.application.dto.PersonneDto;
import evernetflow.example.backend.interfaces.facade.DepartementFacade;
import evernetflow.example.backend.interfaces.facade.PersonneFacade;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DepartementControleur {

    private final DepartementFacade departementFacade;

    public DepartementControleur(DepartementFacade departementFacade) {
        this.departementFacade = departementFacade;
    }
    @GetMapping("/recuperer-les-departements")
    public List<DepartementDto> recupererLesDepartements() {

        return departementFacade.recupererLesDepartements();
    }

    @GetMapping("/departements")
    public List<DepartementDto> rechercherDepartements(@RequestParam String search) {
        return departementFacade.rechercherParDesignation(search);
    }


}
