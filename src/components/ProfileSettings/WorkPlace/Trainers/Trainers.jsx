import React from 'react';

import TrainerCard from './TrainerCard';
import SearchTrainer from './SearchTrainer';
import { Title, Text, Col } from 'components';

const PersonalTrainers = () => {
  return (
    <div>
      <Title textAlign="left" componet="h5" className="my-4">
        Eğitmenler
      </Title>

      <Text
        color="gray3"
        fontSize="1rem"
        fontWeight="500"
        mb="10px"
        fontStyle="italic"
      >
        "Eğitmenler için {30} sonuç listeleniyor"
      </Text>

      <SearchTrainer />

      <div className="personal-trainers__wrapper">
        <Col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Col>

        <Col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Col>

        <Col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Col>

        <Col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Col>
      </div>
    </div>
  );
};

export default PersonalTrainers;
