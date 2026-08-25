-- -----------------------------------------------------
-- Table `nam_db`.`tipo_imovel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nam_db`.`tipo_imovel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nam_db`.`imovel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nam_db`.`imovel` (
  `codigo_imovel` INT NOT NULL AUTO_INCREMENT,
  `descricao_imovel` VARCHAR(150) NOT NULL,
  `tipo_imovel` INT NOT NULL,
  PRIMARY KEY (`codigo_imovel`),
  INDEX `fk_tipo_imovel_idx` (`tipo_imovel` ASC) VISIBLE,
  CONSTRAINT `fk_tipo_imovel`
    FOREIGN KEY (`tipo_imovel`)
    REFERENCES `nam_db`.`tipo_imovel` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nam_db`.`pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nam_db`.`pagamento` (
  `id_venda` INT NOT NULL AUTO_INCREMENT,
  `data_pagamento` DATE NOT NULL,
  `valor_do_pagamento` DECIMAL(10,2) NOT NULL,
  `codigo_imovel` INT NOT NULL,
  PRIMARY KEY (`id_venda`),
  INDEX `fk_codigo_imovel_idx` (`codigo_imovel` ASC) VISIBLE,
  CONSTRAINT `fk_codigo_imovel`
    FOREIGN KEY (`codigo_imovel`)
    REFERENCES `nam_db`.`imovel` (`codigo_imovel`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;