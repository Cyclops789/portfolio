import { useGeneralStore } from '@/stores/general';
import { AvailableCategories, availableCategories } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw, { styled } from 'twin.macro';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const CategoryContainer = styled.div<{ $active: boolean }>`
    ${tw`text-red-600 h-[40px] mb-2 flex items-center border border-transparent rounded cursor-pointer`}
    ${p => p.$active && tw`border-red-600 bg-red-600/20`}

    &:hover {
        ${tw`border-red-600 bg-red-600/20`}
    }
`;

function Categories() {
    const { activeMenuCategory, setActiveMenuCategory } = useGeneralStore();

    return (
        <div css={tw`w-[40%] p-2`}>
            <CategoryContainer
                onClick={() => setActiveMenuCategory(null)}
                $active={activeMenuCategory === null}
            >
                <div css={tw`w-[35px] mx-1`}>
                    <FontAwesomeIcon css={tw`text-[23px]`} icon={faLayerGroup} />
                </div>

                <div css={tw`text-white capitalize`}>
                    All Applications
                </div>
            </CategoryContainer>

            <div css={tw`border-b border-white/25`} />

            {availableCategories.categories_full.map((category, index) => (
                <CategoryContainer
                    onClick={() => setActiveMenuCategory(category.name)}
                    key={category.name}
                    $active={activeMenuCategory === category.name}
                    css={index === 0 && tw`mt-2`}
                >
                    <div css={tw`w-[35px] mx-1`}>
                        <FontAwesomeIcon css={tw`text-[23px]`} icon={category.icon} />
                    </div>

                    <div css={tw`text-white capitalize`}>
                        {category.name}
                    </div>
                </CategoryContainer>
            ))}
        </div>
    )
}

export default Categories;