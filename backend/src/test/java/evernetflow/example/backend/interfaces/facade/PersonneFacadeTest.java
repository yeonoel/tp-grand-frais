package evernetflow.example.backend.interfaces.facade;

import evernetflow.example.backend.application.dto.PersonneDto;
import evernetflow.example.backend.domaine.Departement;
import evernetflow.example.backend.domaine.Personne;
import evernetflow.example.backend.infrastructure.repository.DepartementRepository;
import evernetflow.example.backend.infrastructure.repository.PersonneRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PersonneFacadeTest {

    @Mock
    private PersonneRepository personneRepository;

    @Mock
    private DepartementRepository departementRepository;

    @InjectMocks
    private PersonneFacade personneFacade;

    private Personne personne;
    private PersonneDto personneDto;
    private Departement departement;

    @BeforeEach
    void setUp() {
        departement = new Departement();
        departement.setDesignation("IT");

        personne = new Personne();
        personne.setId(1L);
        personne.setNom("Yeo");
        personne.setPrenom("Noel");
        personne.setAge(30);
        personne.setDepartement(departement);

        personneDto = new PersonneDto(personne);
    }

    @Test
    void testDoitRecupererLesPersonnes() {
        List<Personne> personnes = List.of(personne);
        when(personneRepository.findAll()).thenReturn(personnes);

        List<PersonneDto> result = personneFacade.recupererLesPersonnes();

        assertEquals(1, result.size());
        assertEquals("Yeo", result.get(0).getNom());
    }

    @Test
    void testDoitAjouterUnePersonne() {
        when(departementRepository.findByDesignation("IT")).thenReturn(departement);
        when(personneRepository.save(any(Personne.class))).thenReturn(personne);

        PersonneDto result = personneFacade.ajouterUnePersonne(personneDto);

        assertNotNull(result);
        assertEquals("Yeo", result.getNom());
    }

    @Test
    void testDoitModifierUnePersonne_Reussi() throws Exception {
        when(personneRepository.findById(1L)).thenReturn(Optional.of(personne));
        when(departementRepository.findByDesignation("IT")).thenReturn(departement);
        when(personneRepository.save(any(Personne.class))).thenReturn(personne);

        PersonneDto result = personneFacade.modifierUnePersonne(personneDto, 1L);

        assertNotNull(result);
        assertEquals("Yeo", result.getNom());
    }

    @Test
    void testModifierUnePersonne_NonTrouve() {
        when(personneRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> personneFacade.modifierUnePersonne(personneDto, 1L));
        assertEquals("Cette personne n'existe pas", exception.getMessage());
    }

    @Test
    void testDoitRecupererUnePersonne_Success() throws Exception {
        when(personneRepository.findById(1L)).thenReturn(Optional.of(personne));

        PersonneDto result = personneFacade.recupererUnePersonne(1L);

        assertNotNull(result);
        assertEquals("Yeo", result.getNom());
    }

    @Test
    void testRecupererUnePersonne_NotFound() {
        when(personneRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> personneFacade.recupererUnePersonne(1L));
        assertEquals("Cette personne n'existe pas", exception.getMessage());
    }

    @Test
    void testSupprimerUnePersonne_Success() throws Exception {
        // given (Étant donné) : Préparer les variables et les conditions initiales
        when(personneRepository.findById(1L)).thenReturn(Optional.of(personne));
        doNothing().when(personneRepository).deleteById(1L);

        // when (Quand) : Simuler l'exécution de la méthode
        assertDoesNotThrow(() -> personneFacade.supprimerUnePersonne(1L));

        // then (Alors) : Vérifier si le résultat est celui attendu
        verify(personneRepository, times(1)).deleteById(1L);
    }

    @Test
    void testSupprimerUnePersonne_NotFound() {
        when(personneRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> personneFacade.supprimerUnePersonne(1L));
        assertEquals("Cette personne n'existe pas", exception.getMessage());
    }
}