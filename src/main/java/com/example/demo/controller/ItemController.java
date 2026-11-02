package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private List<Map<String, Object>> items = new ArrayList<>();
    private int idCounter = 1;

    @GetMapping
    public List<Map<String, Object>> obtenerTodos() {
        return items;
    }

    @PostMapping
    public Map<String, Object> crear(@RequestBody Map<String, Object> nuevoItem) {
        nuevoItem.put("id", idCounter++);
        items.add(nuevoItem);
        return nuevoItem;
    }

    @PutMapping("/{id}")
    public Map<String, Object> modificar(@PathVariable int id,
                                         @RequestBody Map<String, Object> datos) {
        for (Map<String, Object> item : items) {
            if ((int) item.get("id") == id) {
                item.put("nombre", datos.get("nombre"));
                return item;
            }
        }
        throw new NoSuchElementException("ID no encontrado");
    }

    @DeleteMapping("/{id}")
    public Map<String, String> eliminar(@PathVariable int id) {
        items.removeIf(item -> (int) item.get("id") == id);
        return Map.of("mensaje", "Eliminado correctamente");
    }
}
