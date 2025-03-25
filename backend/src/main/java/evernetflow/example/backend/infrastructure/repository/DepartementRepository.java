package evernetflow.example.backend.infrastructure.repository;

import evernetflow.example.backend.domaine.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
    Departement findByDesignation(String designation);
    List<Departement> findByDesignationContainingIgnoreCase(String search);
}
