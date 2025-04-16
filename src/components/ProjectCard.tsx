import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from '../assets/css/ProjectCard.module.css';
import githubIcon from '../assets/img/svg/github.svg'

export default function ProjectCard({project}:{project: Project}) {
    const { image, title, description, badges } = project;
    const features = badges.map((badge) => (
        <Badge variant="light" color="gray" key={badge}>
            {badge}
        </Badge>
    ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={image} alt={title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                </Group>
                <Text fz="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" color={'yellow'} style={{ flex: 1 }}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <img src={githubIcon} alt='github icon'/>
                </ActionIcon>
            </Group>
        </Card>
    );
}