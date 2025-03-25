package evernetflow.example.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculTest {
    Calcul calcul;
    @Test
    public void testAdditionner() {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(5, calcul.additionner(2, 3), "L'addition ne fonctionne pas correctement.");


    }

    @Test
    public void testSoustraire() {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(2, calcul.soustraire(5, 3), "La soustraction ne fonctionne pas correctement.");
    }

    @Test
    public void testMultiplier() {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(6, calcul.multiplier(2, 3), "La multiplication ne fonctionne pas correctement.");
    }

    @Test
    public void testDiviser() throws Exception {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(2, calcul.diviser(6, 3), "La division ne fonctionne pas correctement.");

        Exception exception = assertThrows(Exception.class, () -> {
            calcul.diviser(6, 0);
        }, "La division par zéro aurait dû lever une exception.");
    }

    @Test
    public void testCarre() {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(9, calcul.carre(3), "Le carré ne fonctionne pas correctement.");
    }

    @Test
    public void testIdentiteRemarquable() {
        Calcul calcul = new Calcul(0, 0);
        assertEquals(25, calcul.identiteRemarquable(2, 3), "L'identité remarquable ne fonctionne pas correctement.");
    }
}